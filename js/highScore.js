const clearStorage = document.getElementById("clearStorage");
const scoresList = document.getElementById("scoresList");

//function to clean all data in local storage
const clearScores = () => {
  localStorage.clear();
};

//display score of players in descending order
const displayPlayersScores = () => {
  const existingData = JSON.parse(localStorage.getItem("playersData"));
existingData.sort((a,b)=> b.playerScore - a.playerScore)

  for (let i = 0; i < existingData.length; i++) {
    let listElement = document.createElement("li");
    listElement.textContent = `${existingData[i].playerInitials} - ${existingData[i].playerScore}`;
    listElement.setAttribute("style", "list-style-type: decimal; padding-left: 20px; line-height: 1.5; font-size: 20px")
    scoresList.appendChild(listElement);
  }
};
displayPlayersScores()

clearStorage.addEventListener("click", clearScores);