Characters - StarShips - Factions (sub doc to characters)

Characters
- name
- age
- isStarFleet
- factions: [{ name, relationship }]
- location (many to many with starship)

StarShips
- name
- timeInService
- onboard (many to many with characters)