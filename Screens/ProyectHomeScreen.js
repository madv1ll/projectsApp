import ProyectDetail from '../components/ProyectDetail'
import Layout from '../components/Layout'

const ProyectHomeScreen = ({ route }) => {
  return (
    <Layout>
      <ProyectDetail id={route.params.id}/>
    </Layout>
  )
};

export default ProyectHomeScreen