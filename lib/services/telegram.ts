export const formatDataMessage = (eventData: any): string => {
  const { title, description, timestamp, fields } = eventData;

  const formattedFields = Object.entries(fields || {})
    .map(([key, value]) => `*${key}:* ${value}`)
    .join("\n\r");
  return `*${title}*\n_${description}_\n\n*Timestamp:*\n\`${timestamp}\`\n\n*Details:*\n${formattedFields}`;
};
