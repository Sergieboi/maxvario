"use client";

import { FC, useState } from "react";
import { Button, Input, Select, SelectItem, Textarea, Checkbox, Chip } from "@nextui-org/react";
import Container from "@/components/shared/container";

// ─── Types ───────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4 | 5;

interface MissionData {
  // Step 1 – Basics
  missionName: string;
  date: string;
  launchSite: string;
  country: string;
  duration: string;
  goalType: string;

  // Step 2 – Weather
  windSpeed: string;
  windDirection: string;
  cloudBase: string;
  thermalActivity: string;
  weatherNotes: string;

  // Step 3 – Route
  startPoint: string;
  endPoint: string;
  distance: string;
  elevationGain: string;
  escapeRoutes: string;
  terrainNotes: string;

  // Step 4 – Gear
  gear: Record<string, boolean>;

  // Step 5 – Readiness
  fitnessLevel: string;
  recentFlightHours: string;
  familiarWithSite: string;
  emergencyContact: string;
  emergencyPhone: string;
  abortConditions: string;
}

const GEAR_ITEMS = [
  { key: "wing", label: "Paraglider wing (inspected)" },
  { key: "harness", label: "Harness (pre-flight check)" },
  { key: "reserve", label: "Reserve parachute (packed & dated)" },
  { key: "helmet", label: "Helmet" },
  { key: "vario", label: "Variometer / GPS" },
  { key: "radio", label: "Radio" },
  { key: "tracker", label: "Live tracker (SPOT / InReach / Garmin)" },
  { key: "water", label: "Water (min. 1.5 L)" },
  { key: "food", label: "Food / energy snacks" },
  { key: "firstaid", label: "First aid kit" },
  { key: "phone", label: "Fully charged phone" },
  { key: "map", label: "Offline map / airspace chart" },
  { key: "layers", label: "Wind/warm layers" },
  { key: "sunscreen", label: "Sunscreen & sunglasses" },
  { key: "battery", label: "External battery (fully charged) + cables" },
  { key: "poles", label: "Hiking poles" },
  { key: "electrolytes", label: "Electrolytes (for longer missions)" },
  { key: "socks", label: "Extra socks" },
];

const EMPTY: MissionData = {
  missionName: "", date: "", launchSite: "", country: "", duration: "", goalType: "",
  windSpeed: "", windDirection: "", cloudBase: "", thermalActivity: "", weatherNotes: "",
  startPoint: "", endPoint: "", distance: "", elevationGain: "", escapeRoutes: "", terrainNotes: "",
  gear: {},
  fitnessLevel: "", recentFlightHours: "", familiarWithSite: "", emergencyContact: "", emergencyPhone: "", abortConditions: "",
};

// ─── Step components ──────────────────────────────────────────────────────────

function Step1({ data, set }: { data: MissionData; set: (d: Partial<MissionData>) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-bold text-blue-900">Mission Basics</h2>
      <Input label="Mission name" placeholder="e.g. Chamonix speed run" value={data.missionName} onValueChange={v => set({ missionName: v })} variant="bordered" />
      <Input label="Date" type="date" value={data.date} onValueChange={v => set({ date: v })} variant="bordered" />
      <Input label="Launch site" placeholder="e.g. Planpraz" value={data.launchSite} onValueChange={v => set({ launchSite: v })} variant="bordered" />
      <Input label="Country / Region" placeholder="e.g. France – Alps" value={data.country} onValueChange={v => set({ country: v })} variant="bordered" />
      <Select label="Expected duration" selectedKeys={data.duration ? [data.duration] : []} onSelectionChange={k => set({ duration: Array.from(k)[0] as string })} variant="bordered">
        <SelectItem key="1-2h">1 – 2 hours</SelectItem>
        <SelectItem key="2-4h">2 – 4 hours</SelectItem>
        <SelectItem key="4-6h">4 – 6 hours</SelectItem>
        <SelectItem key="6-8h">6 – 8 hours</SelectItem>
        <SelectItem key="8h+">Full day (8 h+)</SelectItem>
      </Select>
      <Select label="Mission goal" selectedKeys={data.goalType ? [data.goalType] : []} onSelectionChange={k => set({ goalType: Array.from(k)[0] as string })} variant="bordered">
        <SelectItem key="fun">Recreational / fun flight</SelectItem>
        <SelectItem key="training">Training / skill building</SelectItem>
        <SelectItem key="race-prep">Race preparation</SelectItem>
        <SelectItem key="competition">Competition</SelectItem>
        <SelectItem key="exploration">Exploration / new route</SelectItem>
      </Select>
    </div>
  );
}

function Step2({ data, set }: { data: MissionData; set: (d: Partial<MissionData>) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-bold text-blue-900">Weather Assessment</h2>
      <Input label="Wind speed at launch (km/h)" placeholder="e.g. 15" type="number" value={data.windSpeed} onValueChange={v => set({ windSpeed: v })} variant="bordered" />
      <Select label="Wind direction" selectedKeys={data.windDirection ? [data.windDirection] : []} onSelectionChange={k => set({ windDirection: Array.from(k)[0] as string })} variant="bordered">
        {["N","NE","E","SE","S","SW","W","NW"].map(d => <SelectItem key={d}>{d}</SelectItem>)}
      </Select>
      <Input label="Expected cloud base (m asl)" placeholder="e.g. 2800" type="number" value={data.cloudBase} onValueChange={v => set({ cloudBase: v })} variant="bordered" />
      <Select label="Thermal activity" selectedKeys={data.thermalActivity ? [data.thermalActivity] : []} onSelectionChange={k => set({ thermalActivity: Array.from(k)[0] as string })} variant="bordered">
        <SelectItem key="none">None (sled ride conditions)</SelectItem>
        <SelectItem key="weak">Weak / smooth</SelectItem>
        <SelectItem key="moderate">Moderate</SelectItem>
        <SelectItem key="strong">Strong / turbulent</SelectItem>
        <SelectItem key="extreme">Extreme – consider aborting</SelectItem>
      </Select>
      <Textarea label="Weather notes" placeholder="NOTAM checked? Forecast source? Any concerns..." value={data.weatherNotes} onValueChange={v => set({ weatherNotes: v })} variant="bordered" minRows={3} />
    </div>
  );
}

function Step3({ data, set }: { data: MissionData; set: (d: Partial<MissionData>) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-bold text-blue-900">Route Planning</h2>
      <Input label="Start / launch point" placeholder="e.g. Planpraz (2000 m)" value={data.startPoint} onValueChange={v => set({ startPoint: v })} variant="bordered" />
      <Input label="Goal / landing point" placeholder="e.g. Les Houches valley" value={data.endPoint} onValueChange={v => set({ endPoint: v })} variant="bordered" />
      <Input label="Estimated distance (km)" placeholder="e.g. 18" type="number" value={data.distance} onValueChange={v => set({ distance: v })} variant="bordered" />
      <Input label="Total elevation gain on foot (m)" placeholder="e.g. 1200" type="number" value={data.elevationGain} onValueChange={v => set({ elevationGain: v })} variant="bordered" />
      <Textarea label="Escape routes" placeholder="Describe your bail-out options if weather changes..." value={data.escapeRoutes} onValueChange={v => set({ escapeRoutes: v })} variant="bordered" minRows={2} />
      <Textarea label="Terrain notes" placeholder="Technical sections, airspace restrictions, known hazards..." value={data.terrainNotes} onValueChange={v => set({ terrainNotes: v })} variant="bordered" minRows={2} />
    </div>
  );
}

function Step4({ data, set }: { data: MissionData; set: (d: Partial<MissionData>) => void }) {
  const toggle = (key: string) => set({ gear: { ...data.gear, [key]: !data.gear[key] } });
  const checked = Object.values(data.gear).filter(Boolean).length;
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-blue-900">Gear Checklist</h2>
        <Chip color={checked === GEAR_ITEMS.length ? "success" : "warning"} variant="flat">
          {checked} / {GEAR_ITEMS.length}
        </Chip>
      </div>
      <div className="flex flex-col gap-3">
        {GEAR_ITEMS.map(item => (
          <Checkbox
            key={item.key}
            isSelected={!!data.gear[item.key]}
            onValueChange={() => toggle(item.key)}
            classNames={{ label: "text-sm" }}
          >
            {item.label}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}

function Step5({ data, set }: { data: MissionData; set: (d: Partial<MissionData>) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-bold text-blue-900">Personal Readiness</h2>
      <Select label="Fitness level today" selectedKeys={data.fitnessLevel ? [data.fitnessLevel] : []} onSelectionChange={k => set({ fitnessLevel: Array.from(k)[0] as string })} variant="bordered">
        <SelectItem key="low">Low – not my best day</SelectItem>
        <SelectItem key="ok">OK – feeling fine</SelectItem>
        <SelectItem key="good">Good – well rested</SelectItem>
        <SelectItem key="peak">Peak – ready for a big day</SelectItem>
      </Select>
      <Input label="Flight hours in last 30 days" placeholder="e.g. 6" type="number" value={data.recentFlightHours} onValueChange={v => set({ recentFlightHours: v })} variant="bordered" />
      <Select label="Familiarity with launch site" selectedKeys={data.familiarWithSite ? [data.familiarWithSite] : []} onSelectionChange={k => set({ familiarWithSite: Array.from(k)[0] as string })} variant="bordered">
        <SelectItem key="first-time">First time – need a local briefing</SelectItem>
        <SelectItem key="some">Flown here before</SelectItem>
        <SelectItem key="familiar">Very familiar with the site</SelectItem>
      </Select>
      <Input label="Emergency contact name" placeholder="e.g. Maria Santos" value={data.emergencyContact} onValueChange={v => set({ emergencyContact: v })} variant="bordered" />
      <Input label="Emergency contact phone" placeholder="e.g. +41 79 123 4567" value={data.emergencyPhone} onValueChange={v => set({ emergencyPhone: v })} variant="bordered" />
      <Textarea label="Abort conditions" placeholder="e.g. If wind exceeds 30 km/h, cloud base drops below 2000 m, or I feel tired at the halfway point..." value={data.abortConditions} onValueChange={v => set({ abortConditions: v })} variant="bordered" minRows={3} />
    </div>
  );
}

// ─── Summary ──────────────────────────────────────────────────────────────────

function riskScore(data: MissionData): { label: string; color: "success" | "warning" | "danger" } {
  let risk = 0;
  if (Number(data.windSpeed) > 30) risk += 2;
  else if (Number(data.windSpeed) > 20) risk += 1;
  if (data.thermalActivity === "strong") risk += 1;
  if (data.thermalActivity === "extreme") risk += 3;
  if (data.fitnessLevel === "low") risk += 1;
  if (data.familiarWithSite === "first-time") risk += 1;
  if (Number(data.recentFlightHours) < 3) risk += 1;
  const gearChecked = Object.values(data.gear).filter(Boolean).length;
  if (gearChecked < GEAR_ITEMS.length * 0.7) risk += 2;
  if (!data.abortConditions) risk += 1;

  if (risk <= 2) return { label: "Low – good to go", color: "success" };
  if (risk <= 4) return { label: "Moderate – review flagged items", color: "warning" };
  return { label: "High – reconsider the mission", color: "danger" };
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

function Summary({ data, onReset }: { data: MissionData; onReset: () => void }) {
  const risk = riskScore(data);
  const gearChecked = Object.values(data.gear).filter(Boolean).length;
  const missingGear = GEAR_ITEMS.filter(g => !data.gear[g.key]).map(g => g.label);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-blue-900">Mission Brief</h2>
        <Chip color={risk.color} variant="flat" size="lg" className="font-semibold">
          Risk: {risk.label}
        </Chip>
      </div>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-2">Basics</h3>
        <SummaryRow label="Mission" value={data.missionName} />
        <SummaryRow label="Date" value={data.date} />
        <SummaryRow label="Launch site" value={`${data.launchSite}${data.country ? `, ${data.country}` : ""}`} />
        <SummaryRow label="Duration" value={data.duration} />
        <SummaryRow label="Goal" value={data.goalType} />
      </section>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-2">Weather</h3>
        <SummaryRow label="Wind" value={data.windSpeed ? `${data.windSpeed} km/h ${data.windDirection}` : ""} />
        <SummaryRow label="Cloud base" value={data.cloudBase ? `${data.cloudBase} m asl` : ""} />
        <SummaryRow label="Thermals" value={data.thermalActivity} />
        <SummaryRow label="Notes" value={data.weatherNotes} />
      </section>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-2">Route</h3>
        <SummaryRow label="Start" value={data.startPoint} />
        <SummaryRow label="Goal" value={data.endPoint} />
        <SummaryRow label="Distance" value={data.distance ? `${data.distance} km` : ""} />
        <SummaryRow label="Elevation gain" value={data.elevationGain ? `${data.elevationGain} m` : ""} />
        <SummaryRow label="Escape routes" value={data.escapeRoutes} />
        <SummaryRow label="Terrain notes" value={data.terrainNotes} />
      </section>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-2">
          Gear ({gearChecked}/{GEAR_ITEMS.length})
        </h3>
        {missingGear.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {missingGear.map(g => (
              <Chip key={g} color="danger" variant="flat" size="sm">{g}</Chip>
            ))}
          </div>
        ) : (
          <Chip color="success" variant="flat">All gear checked ✓</Chip>
        )}
      </section>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-2">Readiness</h3>
        <SummaryRow label="Fitness" value={data.fitnessLevel} />
        <SummaryRow label="Recent flight hours" value={data.recentFlightHours ? `${data.recentFlightHours} h` : ""} />
        <SummaryRow label="Site familiarity" value={data.familiarWithSite} />
        <SummaryRow label="Emergency contact" value={data.emergencyContact ? `${data.emergencyContact} – ${data.emergencyPhone}` : ""} />
        <SummaryRow label="Abort conditions" value={data.abortConditions} />
      </section>

      <div className="flex gap-3 flex-wrap print:hidden">
        <Button color="primary" onPress={() => window.print()}>Print / Save PDF</Button>
        <Button variant="flat" onPress={onReset}>Start new mission</Button>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const STEPS: { label: string; short: string }[] = [
  { label: "Basics", short: "1" },
  { label: "Weather", short: "2" },
  { label: "Route", short: "3" },
  { label: "Gear", short: "4" },
  { label: "Readiness", short: "5" },
];

const MissionPlanner: FC = () => {
  const [step, setStep] = useState<Step>(1);
  const [done, setDone] = useState(false);
  const [data, setData] = useState<MissionData>(EMPTY);

  const set = (patch: Partial<MissionData>) => setData(d => ({ ...d, ...patch }));
  const reset = () => { setData(EMPTY); setStep(1); setDone(false); };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div className="bg-blue-900 text-white pt-32 pb-16">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Hike & Fly Mission Planner</h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            Plan your mission step by step — weather, route, gear, and readiness — then generate a printable brief.
          </p>
        </Container>
      </div>

      <Container className="py-12">
        {done ? (
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md p-8">
            <Summary data={data} onReset={reset} />
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
              {step === 1 && <Step1 data={data} set={set} />}
              {step === 2 && <Step2 data={data} set={set} />}
              {step === 3 && <Step3 data={data} set={set} />}
              {step === 4 && <Step4 data={data} set={set} />}
              {step === 5 && <Step5 data={data} set={set} />}

              <div className="flex justify-between mt-8">
                <Button
                  variant="flat"
                  onPress={() => setStep(s => (s - 1) as Step)}
                  isDisabled={step === 1}
                >
                  Back
                </Button>
                {step < 5 ? (
                  <Button color="primary" onPress={() => setStep(s => (s + 1) as Step)}>
                    Next
                  </Button>
                ) : (
                  <Button color="primary" onPress={() => setDone(true)}>
                    Generate mission brief
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
