import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { Card } from "../../components/Card";
import { CardsContainer } from './styles';
import GlobalFonts from '../../assets/fonts/fonts';
import { FaHeart, FaFacebook, FaTwitter } from "react-icons/fa";
import { useCallback, useEffect, useState  } from 'react';
import { NoInfo } from '../../components/NoInfo';
import { loremIpsum, fullname  } from 'react-lorem-ipsum';



export const Feed = () => {

  const size = 10;
  let [limit, setLimit] = useState(10);

  const fireStore = useFirestore();
  const postColletion = fireStore.collection(process.env.REACT_APP_POSTS)
  const query = postColletion.orderBy('createdDate').limit(limit);

  const handlePage = useCallback(event => {
    
    if (status != 'loading') {
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) 
      {
        const newLimit = limit + size;
        setLimit(newLimit);
      }
    }
  })


  useEffect(() => {
    window.addEventListener('scroll', handlePage);

    return () => {
      window.removeEventListener('scroll', handlePage);
    };
  }, [handlePage]);

  const {data: posts, status, isComplete, hasEmitted} = useFirestoreCollectionData(query, {idField: 'id'});
  


  const handleLike = (post) => () => {
    const likes = post.likes + 1;
    postColletion.doc(post.id).update({likes}).then(res => {
      console.log(res);
    });
  }

  const sharedFaceBook = (post) => () => {
    
  };

  const sharedTwitter = (post) => () => {
    
  };

  const buttons = [
    {
      name: 'Like',
      color: 'red',
      size: '40px',
      onClick: handleLike,
      colorOver: 'red',
      icon: FaHeart
    },
    {
      name: 'FaceBook',
      color: '#1877f2',
      size: '40px',
      onClick: sharedFaceBook,
      colorOver: '#1877f2',
      icon: FaFacebook
    },
    {
      name: 'Twitter',
      color: '#1da1f2',
      size: '40px',
      onClick: sharedTwitter,
      colorOver: '#1da1f2',
      icon: FaTwitter
    }
  ];


  return (
    <>
      <GlobalFonts />
      <CardsContainer>
        {!!posts && posts.map((post, i) => (
            <Card key={i} width="600px" buttons={buttons} element={post}></Card>
        ))}
        {!!posts && posts.length == 0 && <NoInfo />}
      </CardsContainer>
    </>)

}