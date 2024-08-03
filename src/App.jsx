import React from "react";
import { useState } from "react";
import ProjectSideBar from "./components/ProjectSideBar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {
  const[projectsState, setProjectState] = useState({
    selectedProjectId : undefined,
    projects:[],
    tasks:[],
  });

  function handleAddTasks(text){
    setProjectState(prevState => {
      const taskId = Math.random();
      const newTask = {
           text: text, 
           projectId: prevState.selectedProjectId,
           id:taskId, 
      }
      return{
        ...prevState, 
        tasks: [newTask, ...prevState.tasks]
      }
    })
     
  }

  function handleDeleteTasks(id){
    setProjectState(prevState => {
      return{
        ...prevState, 
        
        tasks: prevState.tasks.filter(
          (task) => task.id !== id
        ),
      };
    });
  }

  function handleSelectProject(id){
    setProjectState(prevState => {
      return{
        ...prevState, 
        selectedProjectId: id, 
      }
    });
  }

  function handleStartAtProject(){
    setProjectState(prevState => {
      return{
        ...prevState, 
        selectedProjectId: null, 
      }
    });
  }

  function handleAddProject(projectData){
    setProjectState(prevState => {
      const projectId = Math.random();
      const newProject = {
           ...projectData, 
           id:projectId, 
      }
      return{
        ...prevState, 
        selectedProjectId: undefined,
        projects: [...prevState.projects , newProject ]
      }
    })
  }

  function handleDeleteProject(){
    setProjectState(prevState => {
      return{
        ...prevState, 
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }
  

  
    
  
      let content = <SelectedProject 
      project={projectsState} 
      onDeleteProject={handleDeleteProject}
      onAddTask={handleAddTasks}
      onDeleteTask={handleDeleteTasks}
      tasks={projectsState.tasks}/>;

  
  

  if(projectsState.selectedProjectId === null) {
    content = <NewProject  onAdd={handleAddProject}/>
  }else if (projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAtProject} />;
  }

  return (
    <>
    <main className="h-screen my-8 flex gap-8">
     <ProjectSideBar 
     onStartAddProject={handleStartAtProject} 
     projects={projectsState.projects}
     onSelect={handleSelectProject}
     selectedProjectId={projectsState.selectedProjectId}/>
    {content}

    </main>
  
    </>
  );
}

export default App;
