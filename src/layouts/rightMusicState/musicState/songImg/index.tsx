import './index.scss';

function SongImg(props: { [propName: string]: any }) {
  return (
    <div className="song_img">
      <img src={require('@/assets/images/ico.png')} alt="" />
    </div>
  );
}

export default SongImg;
