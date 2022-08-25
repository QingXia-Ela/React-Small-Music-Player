import './index.scss';

function LeftCoverImg(props: any) {
  const { link } = props;
  return (
    <div
      className="left_cover_img"
      key={link}
      style={{ backgroundImage: `url(${link})` }}
    ></div>
  );
}

export default LeftCoverImg;
