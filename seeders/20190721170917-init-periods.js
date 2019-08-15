"use strict"

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      "Periods",
      [
        {
          name: "Pre-World War I",
          abbreviation: "Pre-WWI",
          fromYear: 0,
          toYear: 1914,
          notes: `This period is intended to cover everything prior to the
First World War, not already covered by a more-specific period.`,
        },
        {
          name: "First World War",
          abbreviation: "WWI",
          fromYear: 1914,
          toYear: 1918,
          notes: `The **First World War** (WWI), also sometimes called
"The Greate War" or "The War to End All Wars", was a global conflict that
originated in Europe. It started on July 28, 1914, with the assassination of
Archduke Franz Ferdinand in Sarajevo. It ended on November 11, 1918, with the
signing of an armistice.`,
        },
        {
          name: "Second World War",
          abbreviation: "WWII",
          fromYear: 1939,
          toYear: 1945,
          notes: `The **Second World War** (WWII) was a global conflict that
lasted from September 1, 1939, to September 2, 1945. Though Japan was already
in conflict with China by 1937, the start of WWII is generally credited to
the German invasion of Poland on September 1, 1939.

The war ended in the European theater with the unconditional surrender of
Germany on May 8, 1945. The Pacific theater conflict ended on August 15, 1945,
with the surrender of Japan. The war was officially considered ended with
Japan's signing of the documents of surrender on September 2, 1945.`,
        },
        {
          name: "Cold War",
          abbreviation: "Cold War",
          fromYear: 1947,
          toYear: 1991,
          notes: `The **Cold War** refers to a period of geopolitical tension
between the Soviet Union (including satellite states) and the United States
(including allies such as NATO). A start date of 1947 refers to the year the
Truman Doctrine was introduced, and the end date of 1991 marks the collapse of
the Soviet Union.`,
        },
        {
          name: "Post-Cold War",
          abbreviation: "Modern",
          fromYear: 1991,
          toYear: 0,
          notes: `The **Post-Cold War** period refers to everything since the
end of the Cold War in 1991. This includes post-Soviet-era Russia and former
Soviet states, ex-Warsaw Pact members, etc. This also covers events that
have happened since then, such as the break-up of Yugoslavia, Middle East
conflicts during the period, and so on.

Note that many standards, origins, etc. are related to both this period and the
Cold War period, as well.`,
        },
      ],
      {}
    )
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("Periods", null, {})
  },
}
