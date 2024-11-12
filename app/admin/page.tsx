import AdminComponent from "./component"

export default function Admin() {

  const users = [
    {
      username: "johndoe",
      email: "john.doe@example.com",
      image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
         },
    {
      username: "sarahjones",
      email: "sarah.jones@example.com",
      image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
         },
    {
      username: "mikebrown",
      email: "mike.brown@example.com",
      image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
         },
    {
      username: "emilywang",
      email: "emily.wang@example.com",
      image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
         },
    {
      username: "alexlee",
      email: "alex.lee@example.com",
      image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
         },
       ];

  return <AdminComponent users={users}/>
}