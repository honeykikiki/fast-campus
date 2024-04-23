import styled from '@emotion/styled'
import ReactMarkDown from 'react-markdown'
import { typographyMap } from '@/styles/typography'

function Contents({ contents }: { contents: string }) {
  return (
    <Container>
      <ReactMarkDown>{contents}</ReactMarkDown>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
  ${typographyMap.t6};

  h2 {
    ${typographyMap.t4};
    font-weight: bold;
    margin: 10px 0;
  }

  ul {
    padding-inline-start: 20px;
    margin: 18px 0;
  }

  li {
    list-style-type: disc;
  }

  p {
    margin: 18px 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`
export default Contents
