export function getHeatmapColor(count: number) {
  if (count === 0) return "#ebedf0";
  if (count < 3) return "#9be9a8";
  if (count < 6) return "#40c463";
  if (count < 10) return "#30a14e";
  return "#216e39";
}
