export default function generateNotificationMessage(type, data) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(dateString));
  };

  switch (type) {
    case "event":
      return {
        title: "New Event Added",
        message: `New event "${data.eventTitle}" has been scheduled on **${formatDate(
          data.date
        )}** at **${data.time}**.`,
      };

    case "note":
      return {
        title: "New Note Added",
        message: `A new note titled "${data.title}" has been uploaded.`,
      };

    case "assignment":
      return {
        title: "New Assignment Added",
        message: `New assignment "${data.title}" has been created. Deadline: **${formatDate(
          data.deadline
        )}**`,
      };

    case "notice":
      return {
        title: "New Notice Published",
        message: `Notice: "${data.title}" has been published.`,
      };

    case "suggestion":
      return {
        title: "New Suggestion Submitted",
        message: `A new suggestion "${data.title}" has been shared.`,
      };

    default:
      return {
        title: "Notification",
        message: "You have a new update.",
      };
  }
}
