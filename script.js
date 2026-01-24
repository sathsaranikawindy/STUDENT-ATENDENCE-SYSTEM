let count = 1;

function addAttendance() {
    const id = document.getElementById("studentId").value;
    const name = document.getElementById("studentName").value;
    const status = document.getElementById("status").value;
    const table = document.getElementById("attendanceTable");

    if (id === "" || name === "") {
        alert("Please enter Student ID and Name");
        return;
    }

    const row = document.createElement("tr");

    const date = new Date().toLocaleDateString();

    row.innerHTML = `
        <td>${count}</td>
        <td>${id}</td>
        <td>${name}</td>
        <td class="${status === "Present" ? "present" : "absent"}">${status}</td>
        <td>${date}</td>
    `;

    table.appendChild(row);
    count++;

    document.getElementById("studentId").value = "";
    document.getElementById("studentName").value = "";
}

