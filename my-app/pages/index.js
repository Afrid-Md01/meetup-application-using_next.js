import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React meet ups</title>
        <meta name = 'description' content="Browse a huge list of highly active React meetups!"></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context){

//   const req = context.req
//   const res = context.res

//   return{
//     props : {
//       meetups : DUMMY_MEETUPS
//     },
//   }
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://afridmd001:mongodbUser2000@cluster0.rjwist1.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const dataBase = client.db();

  const meetupsCollections = dataBase.collection("meetups");

  const meetups = await meetupsCollections.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        description: meetup.description,
        address: meetup.address,
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
