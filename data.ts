export const data = {
  questions: [
    {
      id: 1,
      hasMedia: false,
      isTimed: false,
      text: "С именем какого князя связано объединение Галицкого и Волынского княжеств?",
      answers: [
        {
          id: 0,
          text: "Романа Мстиславича",
          isRight: false,
        },
        { id: 1, text: "Андрея Боголюбского", isRight: false },
        { id: 2, text: "Александра Невского", isRight: false },
        { id: 3, text: "Юрия Долгорукого", isRight: true },
      ],
    },
    {
      id: 2,
      hasMedia: true,
      mediaType: "img",
      isTimed: false,
      timeAllocated: 60,
      mediaSrc: "/images/map1.png",
      text: "Посмотрите на карту и определите о какой войне идет речь?",
      answers: [
        { id: 0, text: "Гражданская война в России", isRight: false },
        { id: 1, text: "Советско-финляндская война", isRight: false },
        { id: 2, text: "Первая мировая война", isRight: false },
        { id: 3, text: "Вторая мировая война", isRight: true },
      ],
    },
  ],
};
