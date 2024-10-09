export const docColumn = [
  {
    header: "NAME",
    accessorKey: "name",
  },
  {
    header: "STATUS",
    accessorKey: "status",
    cell: ({ getValue }) => {
      return getValue() === "synced" ? "LEARNED" : "UNLEARNED";
    },
  },
  {
    header: "EDITED ON",
    accessorKey: "",
  },
  {
    header: "CREATED ON",
    accessorKey: "created_at",
    cell: ({ getValue }) => {
      const date = new Date(getValue() * 1000);
      return date.toLocaleString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      });
    },
  },
];
