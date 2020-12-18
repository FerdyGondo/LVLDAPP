const config = {
    screens: {
      Home: {
        screens: {
          HomeButton: "home",
          Content: "content"
        }
      },
      Profile: {
        path: "profile/:id",
        parse: {
          id: (id) => `${id}`,
        },
      }
    },
  };
  
  const linking = {
    prefixes: ["lvld://"],
    config,
  };
  
  export default linking;