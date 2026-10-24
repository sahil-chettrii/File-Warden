import { useEffect, useState } from "react";
import { subscribeToScan } from "../mock/scanEvents";
import { getPlan } from "../utils/agents";

const initialAgents = (scan) =>
  Object.fromEntries(getPlan(scan).map((id) => [id, { state: "waiting", progress: 0 }]));

export default function useScanProgress(scan) {
  const [agents, setAgents] = useState(() => initialAgents(scan));
  const [complete, setComplete] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setAgents(initialAgents(scan));
    setComplete(false);
    setElapsed(0);

    const startedAt = Date.now();
    const timer = setInterval(() => setElapsed(Math.floor((Date.now() - startedAt) / 1000)), 250);

    const unsubscribe = subscribeToScan(scan, (event) => {
      if (event.type === "complete") {
        clearInterval(timer);
        setComplete(true);
        return;
      }
      setAgents((prev) => ({ ...prev, [event.agent]: { state: event.state, progress: event.progress } }));
    });

    return () => {
      clearInterval(timer);
      unsubscribe();
    };
  }, [scan]);

  const plan = getPlan(scan);
  const overall = Math.round(
    plan.reduce((sum, id) => sum + (agents[id].state === "skipped" ? 100 : agents[id].progress), 0) / plan.length
  );

  return { agents, plan, complete, elapsed, overall };
}