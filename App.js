import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";

export default function App() {
  const [score, setScore] = useState(0);
  const [activeHole, setActiveHole] = useState(null);
  const [gameActive, setGameActive] = useState(false);

  const holes = Array(9).fill(null); // 9 holes for the moles to appear

  useEffect(() => {
    let timer;
    if (gameActive) {
      timer = setInterval(() => {
        const randomHole = Math.floor(Math.random() * 9);
        setActiveHole(randomHole);
      }, 1000); // Mole appears every 1 second
    } else {
      setActiveHole(null);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [gameActive]);

  const handleWhack = (index) => {
    if (index === activeHole) {
      setScore((prevScore) => prevScore + 1);
      setActiveHole(null); // Reset the active hole
    }
  };

  const startGame = () => {
    setScore(0);
    setGameActive(true);
    setTimeout(() => setGameActive(false), 30000); // Game lasts 30 seconds
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Whack-a-Mole</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <FlatList
        data={holes}
        numColumns={3}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.hole,
              activeHole === index && styles.activeHole,
            ]}
            onPress={() => handleWhack(index)}
          />
        )}
      />
      {!gameActive && (
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.startButtonText}>Start Game</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    marginBottom: 20,
  },
  hole: {
    width: 80,
    height: 80,
    margin: 10,
    backgroundColor: "#ccc",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  activeHole: {
    backgroundColor: "green",
  },
  startButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "blue",
    borderRadius: 10,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
