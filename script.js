const output = document.getElementById("output");
const loadingRow = document.createElement("tr");
loadingRow.id = "loading";
loadingRow.innerHTML = `<td colspan="2" class="text-center">Loading...</td>`;
output.appendChild(loadingRow);

function createPromise(name) {
  return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * 3) + 1;
    const start = performance.now();
    setTimeout(() => {
      const end = performance.now();
      const timeTaken = ((end - start) / 1000).toFixed(3);
      resolve({ name, timeTaken });
    }, delay * 1000);
  });
}

const promises = [
  createPromise("Promise 1"),
  createPromise("Promise 2"),
  createPromise("Promise 3"),
];

const overallStart = performance.now();
Promise.all(promises).then((results) => {
  const overallEnd = performance.now();
  const totalTime = ((overallEnd - overallStart) / 1000).toFixed(3);
  output.innerHTML = "";
  results.forEach((res) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${res.name}</td><td>${res.timeTaken}</td>`;
    output.appendChild(row);
  });
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `<td>Total</td><td>${totalTime}</td>`;
  output.appendChild(totalRow);
});
