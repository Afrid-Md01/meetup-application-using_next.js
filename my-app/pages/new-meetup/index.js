import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from 'next/head'
import NewMeetUpForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupDate) => {
    try {
      const response = await fetch("/api/new-meetup", {
        method: "POST",
        body: JSON.stringify(enteredMeetupDate),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/");
      }

      console.log(data);
    } catch (error) {
      alert("something went wrong");
    }
  };
  return (
    <Fragment>
      <Head>
        <title>Add a new meet up</title>
        <meta
          name="description"
          content="Create your own new meet up and create amazing networking opportunities "
        ></meta>
      </Head>
      <NewMeetUpForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}
export default NewMeetupPage;
