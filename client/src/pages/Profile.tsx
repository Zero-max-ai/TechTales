import Layout from "../components/layout/Layout";
import UserProfile from "../components/UserProfile"
import UserAbout from "../components/UserAbout"
import EditProfile from "../components/EditProfile"


const Profile = () => {
  return (
    <Layout>
      <div className="pt-40 flex flex-col items-center justify-center">
        <div className="w-100 shadow p-2 rounded">
          <UserProfile />
          <div>
            <UserAbout />
            <EditProfile />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile;
