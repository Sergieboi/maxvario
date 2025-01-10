import { MVRace } from "@/lib/types/misc";
import { FC } from "react";
import Container from "../shared/container";

type Props = {
  race: MVRace;
};

const SingleRace: FC<Props> = ({ race }) => {
  return (
    <>
      <div></div>
      <Container>{race.title}</Container>
    </>
  );
};

export default SingleRace;
