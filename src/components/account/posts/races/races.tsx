import React, { FC } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Avatar,
} from "@nextui-org/react";
import { MVRace } from "@/lib/types/misc";
import { useTranslations } from "next-intl";
import { capitalize } from "@/lib/utils";
import {
  ChevronDownIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const statusColorMap: Record<string, ChipProps["color"]> = {
  publish: "success",
  draft: "warning",
};

type Props = {
  races: Array<MVRace>;
};

const RacesTable: FC<Props> = ({ races }) => {
  const t = useTranslations();
  const statusOptions = [
    { name: t("account.data.status.publish.title"), uid: "publish" },
    { name: t("account.data.status.draft.title"), uid: "draft" },
  ];
  const columns = [
    // { name: t("account.races.column.id"), uid: "id", sortable: true },
    { name: t("account.races.column.title"), uid: "title", sortable: true },
    { name: t("account.races.column.country"), uid: "country", sortable: true },
    { name: t("account.races.column.date"), uid: "date", sortable: true },
    { name: t("account.races.column.registration"), uid: "registration" },
    { name: t("account.races.column.fai"), uid: "fai" },
    { name: t("account.races.column.format"), uid: "format" },
    { name: t("account.races.column.athlete"), uid: "athlete" },
    { name: t("account.races.column.status"), uid: "status" },
    { name: t("account.races.column.actions"), uid: "actions" },
  ];
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(columns.map((column) => column.uid))
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredRaces = [...races];

    if (hasSearchFilter) {
      filteredRaces = filteredRaces.filter((user) =>
        user.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredRaces = filteredRaces.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredRaces;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [races, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: MVRace, b: MVRace) => {
      let first = a[sortDescriptor.column as keyof MVRace] as number;
      let second = b[sortDescriptor.column as keyof MVRace] as number;
      if (sortDescriptor.column === "country") {
        first = a.location_data?.country?.charCodeAt(0) ?? 0;
        second = b.location_data?.country?.charCodeAt(0) ?? 0;
      } else if (sortDescriptor.column === "date") {
        first = new Date(a.start_date).getTime();
        second = new Date(b.start_date).getTime();
      }
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((race: MVRace, columnKey: React.Key) => {
    const cellValue = race[columnKey as keyof MVRace];

    switch (columnKey) {
      case "date":
        return <>{race.start_date.substring(0, 10)}</>;
      case "registration":
        return (
          <>
            {race?.registration_date
              ? race.registration_date.substring(0, 10)
              : "N/A"}{" "}
            -{" "}
            {race?.registration_end_date
              ? race.registration_end_date.substring(0, 10)
              : "N/A"}
          </>
        );
      case "fai":
        return (
          <div className="flex items-center gap-2">
            {race.fai_category.map((c) => c.name).join(", ")}
          </div>
        );
      case "format":
        return (
          <div className="flex items-center gap-2">
            {(race?.race_format ?? [])?.map((c) => c.name).join(", ")}
          </div>
        );
      case "athlete":
        return (
          <div className="flex items-center gap-2">
            {race.athlete_category.map((c) => c.name).join(", ")}
          </div>
        );
      case "country":
        return (
          <div className="flex items-center gap-2">
            <Avatar
              src={`/assets/flags/${race?.location_data?.country_short?.toLowerCase()}.svg`}
            />
            <span>{race?.location_data?.country}</span>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[race.status]}
            size="sm"
            variant="flat"
          >
            {cellValue as string}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <EllipsisVerticalIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="view">
                  <Link
                    className="flex w-full"
                    href={`/races/${race.slug}`}
                    title={race.title}
                  >
                    {t("account.data.options.view.title")}
                  </Link>
                </DropdownItem>
                <DropdownItem key="edit">
                  {t("account.data.options.edit.title")}
                </DropdownItem>
                <DropdownItem key="delete">
                  {t("account.data.options.delete.title")}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue !== undefined && typeof cellValue !== "object"
          ? cellValue
          : String(cellValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder={t("common.searchByTitle")}
            startContent={<MagnifyingGlassIcon className="size-5" />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  {t("common.status")}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label={t("common.tableColumns")}
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  {t("common.columns")}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label={t("common.tableColumns")}
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              color="primary"
              endContent={<PlusIcon />}
              as={Link}
              href={`/account/new/race`}
            >
              {t("common.add")}
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            {t("account.races.total", { count: races.length })}
          </span>
          <label className="flex items-center text-default-400 text-small">
            {t("common.rowsPerPage")}
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    races.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? t("common.allSelected")
            : t("common.xItemsSelected", {
                selected: selectedKeys.size,
                all: filteredItems.length,
              })}{" "}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            {t("common.previous")}
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            {t("common.next")}
          </Button>
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      // selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No races found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell key={columnKey}>
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default RacesTable;
