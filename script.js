let count = 1;

window.onload = function() {
    loadSavedData();
};

function addAttendance() {
    const id = document.getElementById("studentId").value;
    const name = document.getElementById("studentName").value;
    const status = document.getElementById("status").value;

    if (id === "" || name === "") {
        alert("Please enter Student ID and Name");
        return;
    }

    const date = new Date().toLocaleDateString();
    const newRecord = { id, name, status, date };

    addRowToTable(newRecord, count - 1); // index එක ලබා දීම
    saveToLocalStorage(newRecord);

    document.getElementById("studentId").value = "";
    document.getElementById("studentName").value = "";
}

function addRowToTable(record, index) {
    const table = document.getElementById("attendanceTable");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${count}</td>
        <td>${record.id}</td>
        <td>${record.name}</td>
        <td class="${record.status === "Present" ? "present" : "absent"}">${record.status}</td>
        <td>${record.date}</td>
        <td><button style="background:red; color:white; border:none; padding:5px; cursor:pointer;" onclick="deleteRecord(${index})">Delete</button></td>
    `;

    table.appendChild(row);
    count++;
}

function saveToLocalStorage(record) {
    let attendanceList = JSON.parse(localStorage.getItem("attendanceData")) || [];
    attendanceList.push(record);
    localStorage.setItem("attendanceData", JSON.stringify(attendanceList));
}

function deleteRecord(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        let attendanceList = JSON.parse(localStorage.getItem("attendanceData")) || [];
        attendanceList.splice(index, 1);
        localStorage.setItem("attendanceData", JSON.stringify(attendanceList));
        location.reload();
    }
} 

function loadSavedData() {
    let attendanceList = JSON.parse(localStorage.getItem("attendanceData")) || [];
    attendanceList.forEach((record, index) => {
        addRowToTable(record, index);
    });
} 