const clearStorage = document.getElementById("clearStorage");
const scoresList = document.getElementById("scoresList");

//function to clean all data in local storage
const clearScores = () => {
  try {
    localStorage.removeItem("playersData");
    scoresList.innerHTML = "";
    } catch (error) {
    console.error("Local storage is empty");
  }
};

//display score of players in descending order
const displayPlayersScores = () => {
  const existingData = JSON.parse(localStorage.getItem("playersData"));
  existingData.sort((a, b) => b.playerScore - a.playerScore);

  const numPlayersToDisplay = Math.min(5, existingData.length);

  for (let i = 0; i < numPlayersToDisplay; i++) {
    let listElement = document.createElement("li");
    listElement.textContent = `${existingData[i].playerInitials} - ${existingData[i].playerScore}`;
    listElement.setAttribute(
      "style",
      "list-style-type: decimal; padding-left: 20px; line-height: 1.5; font-size: 20px"
    );
    scoresList.appendChild(listElement);
  }
};
displayPlayersScores();

clearStorage.addEventListener("click", clearScores);