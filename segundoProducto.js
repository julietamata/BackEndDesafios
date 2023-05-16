const posts = [
    {title: 'Post 1', body: 'This is post 1'},
    {title: 'Post 2', body: 'This is post 2'}

]

const getPosts = () => {

}


function miPromesa() {

    return new Promise((resolve) => {

      setTimeout(() => {

        const miArray = ['elemento1', 'elemento2', 'elemento3'];

        resolve(miArray);

      }, 2000);

    });

  }

  

  miPromesa().then((resultado) => {

    console.log(resultado);

  }).catch((error) => {

    console.error(error);

  });