const activity = [
  { label: "Planning", value: 72 },
  { label: "Build", value: 92 },
  { label: "Review", value: 84 },
  { label: "Handoff", value: 96 },
];

const activityList = document.querySelector("#activity-list");

if (activityList) {
  activityList.innerHTML = activity
    .map(
      ({ label, value }) => `
        <li>
          <span>${label}</span>
          <span class="bar" style="width: ${value}%" aria-hidden="true"></span>
          <span>${value}%</span>
        </li>`,
    )
    .join("");
}

const toggle = document.querySelector("#toggle-details");
const notes = document.querySelector("#report-notes");

toggle?.addEventListener("click", () => {
  const expanded = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!expanded));
  toggle.textContent = expanded ? "Show report notes" : "Hide report notes";
  notes.hidden = expanded;
});
