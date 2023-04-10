import ProjectDetail from '../components/ProjectDetail'
import Layout from '../components/Layout'

const ProjectHomeScreen = ({ route }) => {
  return (
    <Layout>
      <ProjectDetail id={route.params.id}/>
    </Layout>
  )
};

export default ProjectHomeScreen