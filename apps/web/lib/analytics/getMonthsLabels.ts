

export function getMonthsLabels(weeks: Array<Array<{ date: string }>>) {
  const labels: string[] = [];
  weeks.forEach((week) => {
    const firstDay = week[0];
    const date = new Date(firstDay.date);
    labels.push(date.toLocaleString("default", { month: "short" }));
  });

  return labels;
}
