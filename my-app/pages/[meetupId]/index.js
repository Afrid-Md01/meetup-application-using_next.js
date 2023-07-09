import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
import MeetupDetails from "../../components/meetups/MeetupDetails";

function MeetupDetailsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.title} />
      </Head>

      <MeetupDetails
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://afridmd001:mongodbUser2000@cluster0.rjwist1.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const dataBase = client.db();

  const meetupsCollections = dataBase.collection("meetups");

  const meetups = await meetupsCollections.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: true,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://afridmd001:mongodbUser2000@cluster0.rjwist1.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const dataBase = client.db();

  const meetupsCollections = dataBase.collection("meetups");

  const selectedMeetup = await meetupsCollections.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}
export default MeetupDetailsPage;
