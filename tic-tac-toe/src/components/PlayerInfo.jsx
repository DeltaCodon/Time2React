import { useState } from "react";

function Player({ initialName, symbol, isActivePlayer, onChangeName }) {
  const [isEdititng, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function onTriggering() {
    setIsEditing((editing) => !editing); // when updating opposite states, use a function so it updates immediately
    if (isEdititng) {
      onChangeName(symbol, playerName);
    }

    console.log(isEdititng);
  }

  function handleChange(e) {
    setPlayerName(e.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEdititng) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    ); // two way binging
  }

  return (
    <li className={isActivePlayer ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={onTriggering}>{isEdititng ? "Save" : "Edit"}</button>
    </li>
  );
}

export default Player;
