import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { FC } from 'react';
import connectToDb from 'dbConnect';

interface Props {
  test: GetStaticPropsContext<ParsedUrlQuery, PreviewData>;
}

const Test: FC<Props> = (props) => {
  const { test } = props;
  console.log(test);
  return <p></p>;
};

export default Test;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [{ params: { room: 'kitchen' } }];

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const room = context.params?.room;

  const { db } = await connectToDb();

  return {
    props: {
      test: room
    }
  };
};
