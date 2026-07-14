const projects = [
    {
    title: "CubMart",
    description: "A modern e-commerce experience featuring product filtering, shopping cart management, and responsive layouts.",
    link: "#"
  },
  {
    title: "TaskFlow",
    description: "A productivity-focused task manager with persistent storage, task completion tracking, and a clean user experience.",
    link: "#"
  },
  {
    title: "Calculator",
    description: "A responsive calculator built using HTML, CSS, and JavaScript.",
    link: "#"
  },

];

const container = document.querySelector("#projectsContainer");

if (container) {
  const projectsHTML = projects.map(project => `
    <div class="project-card">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <a href="${project.link}">Live Demo</a>
    </div>
  `).join("");

  // حقن النص دفعة واحدة داخل الحاوية
  container.innerHTML = projectsHTML;
}

(async () => {

    await loadSlim(tsParticles);


    await tsParticles.load({

        id: "tsparticles",

        options: {

            background:{
                color:"#081420"
            },


            particles: {

                number:{
                    value:50
                },


                color:{
                    value:"#ffffff"
                },


                shape:{
                    type:"circle"
                },


                opacity:{
                    value:{
                        min:0.3,
                        max:1
                    }
                },


                size:{
                    value:{
                        min:1,
                        max:3
                    }
                },


                move:{
                    enable:true,

                    speed:1,

                    direction:"bottom",

                    straight:true,


                    outModes:{
                        default:"out"
                    }
                }

            },


            interactivity:{

                events:{
                    onHover:{
                        enable:true,
                        mode:"repulse"
                    }
                },


                modes:{
                    repulse:{
                        distance:100
                    }
                }

            },


            detectRetina:true

        }

    });

})();