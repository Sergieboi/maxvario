"use client";

import { FC, useState } from "react";
import { Button, Input, Select, SelectItem, Textarea, Checkbox, Chip } from "@nextui-org/react";
import Container from "@/components/shared/container";
import { useTranslations } from "next-intl";

type T = ReturnType<typeof useTranslations<"missionPlanner">>;

// ─── Types ───────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4 | 5;

interface MissionData {
  missionName: string;
  date: string;
  launchSite: string;
  country: string;
  duration: string;
  goalType: string;
  windSpeed: string;
  windDirection: string;
  cloudBase: string;
  thermalActivity: string;
  weatherNotes: string;
  startPoint: string;
  endPoint: string;
  distance: string;
  elevationGain: string;
  escapeRoutes: string;
  terrainNotes: string;
  gear: Record<string, boolean>;
  fitnessLevel: string;
  recentFlightHours: string;
  familiarWithSite: string;
  emergencyContact: string;
  emergencyPhone: string;
  abortConditions: string;
}

const GEAR_KEYS = [
  "wing","harness","reserve","helmet","vario","radio","tracker","water",
  "food","firstaid","phone","map","layers","sunscreen","battery","poles",
  "electrolytes","socks",
] as const;

const EMPTY: MissionData = {
  missionName: "", date: "", launchSite: "", country: "", duration: "", goalType: "",
  windSpeed: "", windDirection: "", cloudBase: "", thermalActivity: "", weatherNotes: "",
  startPoint: "", endPoint: "", distance: "", elevationGain: "", escapeRoutes: "", terrainNotes: "",
  gear: {},
  fitnessLevel: "", recentFlightHours: "", familiarWithSite: "", emergencyContact: "", emergencyPhone: "", abortConditions: "",
};

// ─── Step components ──────────────────────────────────────────────────────────

function Step1({ data, set, t }: { data: MissionData; set: (d: Partial<MissionData>) => void; t: T }) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-semibold text-blue-900">{t("step1.title")}</h2>
      <Input label={t("step1.missionName")} placeholder={t("step1.missionNamePlaceholder")} value={data.missionName} onValueChange={v => set({ missionName: v })} variant="bordered" />
      <Input label={t("step1.date")} type="date" value={data.date} onValueChange={v => set({ date: v })} variant="bordered" />
      <Input label={t("step1.launchSite")} placeholder={t("step1.launchSitePlaceholder")} value={data.launchSite} onValueChange={v => set({ launchSite: v })} variant="bordered" />
      <Input label={t("step1.country")} placeholder={t("step1.countryPlaceholder")} value={data.country} onValueChange={v => set({ country: v })} variant="bordered" />
      <Select label={t("step1.duration")} selectedKeys={data.duration ? [data.duration] : []} onSelectionChange={k => set({ duration: Array.from(k)[0] as string })} variant="bordered">
        <SelectItem key="1-2h">{t("step1.durationOptions.1-2h")}</SelectItem>
        <SelectItem key="2-4h">{t("step1.durationOptions.2-4h")}</SelectItem>
        <SelectItem key="4-6h">{t("step1.durationOptions.4-6h")}</SelectItem>
        <SelectItem key="6-8h">{t("step1.durationOptions.6-8h")}</SelectItem>
        <SelectItem key="8h+">{t("step1.durationOptions.8h+")}</SelectItem>
      </Select>
      <Select label={t("step1.goal")} selectedKeys={data.goalType ? [data.goalType] : []} onSelectionChange={k => set({ goalType: Array.from(k)[0] as string })} variant="bordered">
        <SelectItem key="fun">{t("step1.goalOptions.fun")}</SelectItem>
        <SelectItem key="training">{t("step1.goalOptions.training")}</SelectItem>
        <SelectItem key="race-prep">{t("step1.goalOptions.race-prep")}</SelectItem>
        <SelectItem key="competition">{t("step1.goalOptions.competition")}</SelectItem>
        <SelectItem key="exploration">{t("step1.goalOptions.exploration")}</SelectItem>
      </Select>
    </div>
  );
}

function Step2({ data, set, t }: { data: MissionData; set: (d: Partial<MissionData>) => void; t: T }) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-semibold text-blue-900">{t("step2.title")}</h2>
      <Input label={t("step2.windSpeed")} placeholder={t("step2.windSpeedPlaceholder")} type="number" value={data.windSpeed} onValueChange={v => set({ windSpeed: v })} variant="bordered" />
      <Select label={t("step2.windDirection")} selectedKeys={data.windDirection ? [data.windDirection] : []} onSelectionChange={k => set({ windDirection: Array.from(k)[0] as string })} variant="bordered">
        {["N","NE","E","SE","S","SW","W","NW"].map(d => <SelectItem key={d}>{d}</SelectItem>)}
      </Select>
      <Input label={t("step2.cloudBase")} placeholder={t("step2.cloudBasePlaceholder")} type="number" value={data.cloudBase} onValueChange={v => set({ cloudBase: v })} variant="bordered" />
      <Select label={t("step2.thermalActivity")} selectedKeys={data.thermalActivity ? [data.thermalActivity] : []} onSelectionChange={k => set({ thermalActivity: Array.from(k)[0] as string })} variant="bordered">
        <SelectItem key="none">{t("step2.thermalOptions.none")}</SelectItem>
        <SelectItem key="weak">{t("step2.thermalOptions.weak")}</SelectItem>
        <SelectItem key="moderate">{t("step2.thermalOptions.moderate")}</SelectItem>
        <SelectItem key="strong">{t("step2.thermalOptions.strong")}</SelectItem>
        <SelectItem key="extreme">{t("step2.thermalOptions.extreme")}</SelectItem>
      </Select>
      <Textarea label={t("step2.weatherNotes")} placeholder={t("step2.weatherNotesPlaceholder")} value={data.weatherNotes} onValueChange={v => set({ weatherNotes: v })} variant="bordered" minRows={3} />
    </div>
  );
}

function Step3({ data, set, t }: { data: MissionData; set: (d: Partial<MissionData>) => void; t: T }) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-semibold text-blue-900">{t("step3.title")}</h2>
      <Input label={t("step3.startPoint")} placeholder={t("step3.startPointPlaceholder")} value={data.startPoint} onValueChange={v => set({ startPoint: v })} variant="bordered" />
      <Input label={t("step3.endPoint")} placeholder={t("step3.endPointPlaceholder")} value={data.endPoint} onValueChange={v => set({ endPoint: v })} variant="bordered" />
      <Input label={t("step3.distance")} placeholder={t("step3.distancePlaceholder")} type="number" value={data.distance} onValueChange={v => set({ distance: v })} variant="bordered" />
      <Input label={t("step3.elevationGain")} placeholder={t("step3.elevationGainPlaceholder")} type="number" value={data.elevationGain} onValueChange={v => set({ elevationGain: v })} variant="bordered" />
      <Textarea label={t("step3.escapeRoutes")} placeholder={t("step3.escapeRoutesPlaceholder")} value={data.escapeRoutes} onValueChange={v => set({ escapeRoutes: v })} variant="bordered" minRows={2} />
      <Textarea label={t("step3.terrainNotes")} placeholder={t("step3.terrainNotesPlaceholder")} value={data.terrainNotes} onValueChange={v => set({ terrainNotes: v })} variant="bordered" minRows={2} />
    </div>
  );
}

function Step4({ data, set, t }: { data: MissionData; set: (d: Partial<MissionData>) => void; t: T }) {
  const toggle = (key: string) => set({ gear: { ...data.gear, [key]: !data.gear[key] } });
  const checked = Object.values(data.gear).filter(Boolean).length;
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-blue-900">{t("step4.title")}</h2>
        <Chip color={checked === GEAR_KEYS.length ? "success" : "warning"} variant="flat">
          {checked} / {GEAR_KEYS.length}
        </Chip>
      </div>
      <div className="flex flex-col gap-3">
        {GEAR_KEYS.map(key => (
          <Checkbox
            key={key}
            isSelected={!!data.gear[key]}
            onValueChange={() => toggle(key)}
            classNames={{ label: "text-sm" }}
          >
            {t(`step4.items.${key}`)}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}

function Step5({ data, set, t }: { data: MissionData; set: (d: Partial<MissionData>) => void; t: T }) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-semibold text-blue-900">{t("step5.title")}</h2>
      <Select label={t("step5.fitnessLevel")} selectedKeys={data.fitnessLevel ? [data.fitnessLevel] : []} onSelectionChange={k => set({ fitnessLevel: Array.from(k)[0] as string })} variant="bordered">
        <SelectItem key="low">{t("step5.fitnessOptions.low")}</SelectItem>
        <SelectItem key="ok">{t("step5.fitnessOptions.ok")}</SelectItem>
        <SelectItem key="good">{t("step5.fitnessOptions.good")}</SelectItem>
        <SelectItem key="peak">{t("step5.fitnessOptions.peak")}</SelectItem>
      </Select>
      <Input label={t("step5.recentFlightHours")} placeholder={t("step5.recentFlightHoursPlaceholder")} type="number" value={data.recentFlightHours} onValueChange={v => set({ recentFlightHours: v })} variant="bordered" />
      <Select label={t("step5.siteFamiliarity")} selectedKeys={data.familiarWithSite ? [data.familiarWithSite] : []} onSelectionChange={k => set({ familiarWithSite: Array.from(k)[0] as string })} variant="bordered">
        <SelectItem key="first-time">{t("step5.siteFamiliarityOptions.first-time")}</SelectItem>
        <SelectItem key="some">{t("step5.siteFamiliarityOptions.some")}</SelectItem>
        <SelectItem key="familiar">{t("step5.siteFamiliarityOptions.familiar")}</SelectItem>
      </Select>
      <Input label={t("step5.emergencyContact")} placeholder={t("step5.emergencyContactPlaceholder")} value={data.emergencyContact} onValueChange={v => set({ emergencyContact: v })} variant="bordered" />
      <Input label={t("step5.emergencyPhone")} placeholder={t("step5.emergencyPhonePlaceholder")} value={data.emergencyPhone} onValueChange={v => set({ emergencyPhone: v })} variant="bordered" />
      <Textarea label={t("step5.abortConditions")} placeholder={t("step5.abortConditionsPlaceholder")} value={data.abortConditions} onValueChange={v => set({ abortConditions: v })} variant="bordered" minRows={3} />
    </div>
  );
}

// ─── Summary ──────────────────────────────────────────────────────────────────

function riskScore(data: MissionData, t: T): { label: string; color: "success" | "warning" | "danger" } {
  let risk = 0;
  if (Number(data.windSpeed) > 30) risk += 2;
  else if (Number(data.windSpeed) > 20) risk += 1;
  if (data.thermalActivity === "strong") risk += 1;
  if (data.thermalActivity === "extreme") risk += 3;
  if (data.fitnessLevel === "low") risk += 1;
  if (data.familiarWithSite === "first-time") risk += 1;
  if (Number(data.recentFlightHours) < 3) risk += 1;
  const gearChecked = Object.values(data.gear).filter(Boolean).length;
  if (gearChecked < GEAR_KEYS.length * 0.7) risk += 2;
  if (!data.abortConditions) risk += 1;

  if (risk <= 2) return { label: t("summary.riskLow"), color: "success" };
  if (risk <= 4) return { label: t("summary.riskModerate"), color: "warning" };
  return { label: t("summary.riskHigh"), color: "danger" };
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-2 py-1 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <span className="text-sm text-gray-500 w-48 shrink-0">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

function Summary({ data, onReset, t }: { data: MissionData; onReset: () => void; t: T }) {
  const risk = riskScore(data, t);
  const gearChecked = Object.values(data.gear).filter(Boolean).length;
  const missingGear = GEAR_KEYS.filter(k => !data.gear[k]).map(k => t(`step4.items.${k}`));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-semibold text-blue-900">{t("summary.title")}</h2>
        <Chip color={risk.color} variant="flat" size="lg" className="font-semibold">
          {t("summary.riskLabel")}: {risk.label}
        </Chip>
      </div>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-2">{t("summary.sections.basics")}</h3>
        <SummaryRow label={t("summary.labels.mission")} value={data.missionName} />
        <SummaryRow label={t("summary.labels.date")} value={data.date} />
        <SummaryRow label={t("summary.labels.launchSite")} value={`${data.launchSite}${data.country ? `, ${data.country}` : ""}`} />
        <SummaryRow label={t("summary.labels.duration")} value={data.duration} />
        <SummaryRow label={t("summary.labels.goal")} value={data.goalType} />
      </section>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-2">{t("summary.sections.weather")}</h3>
        <SummaryRow label={t("summary.labels.wind")} value={data.windSpeed ? `${data.windSpeed} km/h ${data.windDirection}` : ""} />
        <SummaryRow label={t("summary.labels.cloudBase")} value={data.cloudBase ? `${data.cloudBase} m asl` : ""} />
        <SummaryRow label={t("summary.labels.thermals")} value={data.thermalActivity} />
        <SummaryRow label={t("summary.labels.notes")} value={data.weatherNotes} />
      </section>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-2">{t("summary.sections.route")}</h3>
        <SummaryRow label={t("summary.labels.start")} value={data.startPoint} />
        <SummaryRow label={t("summary.labels.end")} value={data.endPoint} />
        <SummaryRow label={t("summary.labels.distance")} value={data.distance ? `${data.distance} km` : ""} />
        <SummaryRow label={t("summary.labels.elevationGain")} value={data.elevationGain ? `${data.elevationGain} m` : ""} />
        <SummaryRow label={t("summary.labels.escapeRoutes")} value={data.escapeRoutes} />
        <SummaryRow label={t("summary.labels.terrainNotes")} value={data.terrainNotes} />
      </section>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-2">
          {t("summary.sections.gear")} ({gearChecked}/{GEAR_KEYS.length})
        </h3>
        {missingGear.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {missingGear.map(g => (
              <Chip key={g} color="danger" variant="flat" size="sm">{g}</Chip>
            ))}
          </div>
        ) : (
          <Chip color="success" variant="flat">{t("summary.allGearChecked")} ✓</Chip>
        )}
      </section>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-2">{t("summary.sections.readiness")}</h3>
        <SummaryRow label={t("summary.labels.fitness")} value={data.fitnessLevel} />
        <SummaryRow label={t("summary.labels.recentHours")} value={data.recentFlightHours ? `${data.recentFlightHours} h` : ""} />
        <SummaryRow label={t("summary.labels.siteFamiliarity")} value={data.familiarWithSite} />
        <SummaryRow label={t("summary.labels.emergencyContact")} value={data.emergencyContact ? `${data.emergencyContact} – ${data.emergencyPhone}` : ""} />
        <SummaryRow label={t("summary.labels.abortConditions")} value={data.abortConditions} />
      </section>

      <div className="flex gap-3 flex-wrap print:hidden">
        <Button color="primary" onPress={() => window.print()}>{t("summary.print")}</Button>
        <Button variant="flat" onPress={onReset}>{t("summary.reset")}</Button>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const MissionPlanner: FC = () => {
  const t = useTranslations("missionPlanner");
  const [step, setStep] = useState<Step>(1);
  const [done, setDone] = useState(false);
  const [data, setData] = useState<MissionData>(EMPTY);

  const set = (patch: Partial<MissionData>) => setData(d => ({ ...d, ...patch }));
  const reset = () => { setData(EMPTY); setStep(1); setDone(false); };

  const STEPS = [
    { label: t("steps.basics"),    short: "1" },
    { label: t("steps.weather"),   short: "2" },
    { label: t("steps.route"),     short: "3" },
    { label: t("steps.gear"),      short: "4" },
    { label: t("steps.readiness"), short: "5" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div className="bg-blue-900 text-white pt-32 pb-16">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{t("heroTitle")}</h1>
          <p className="text-blue-200 text-lg max-w-2xl">{t("heroDescription")}</p>
        </Container>
      </div>

      <Container className="py-12">
        {done ? (
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md p-8">
            <Summary data={data} onReset={reset} t={t} />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            {/* Progress bar */}
            <div className="flex items-center gap-2 mb-8">
              {STEPS.map((s, i) => {
                const n = (i + 1) as Step;
                const active = n === step;
                const past = n < step;
                return (
                  <div key={i} className="flex items-center flex-1">
                    <button
                      onClick={() => n < step && setStep(n)}
                      className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center shrink-0 transition-colors
                        ${active ? "bg-blue-900 text-white" : past ? "bg-blue-200 text-blue-900 cursor-pointer" : "bg-gray-200 text-gray-500"}`}
                    >
                      {past ? "✓" : s.short}
                    </button>
                    <span className={`ml-1 text-xs hidden sm:block ${active ? "text-blue-900 font-semibold" : "text-gray-400"}`}>
                      {s.label}
                    </span>
                    {i < STEPS.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-2 ${past ? "bg-blue-200" : "bg-gray-200"}`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-8">
              {step === 1 && <Step1 data={data} set={set} t={t} />}
              {step === 2 && <Step2 data={data} set={set} t={t} />}
              {step === 3 && <Step3 data={data} set={set} t={t} />}
              {step === 4 && <Step4 data={data} set={set} t={t} />}
              {step === 5 && <Step5 data={data} set={set} t={t} />}

              <div className="flex justify-between mt-8">
                <Button variant="flat" onPress={() => setStep(s => (s - 1) as Step)} isDisabled={step === 1}>
                  {t("nav.back")}
                </Button>
                {step < 5 ? (
                  <Button color="primary" onPress={() => setStep(s => (s + 1) as Step)}>
                    {t("nav.next")}
                  </Button>
                ) : (
                  <Button color="primary" onPress={() => setDone(true)}>
                    {t("nav.generate")}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default MissionPlanner;
