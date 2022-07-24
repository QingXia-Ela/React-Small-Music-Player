import './index.scss';
import TransparentButton from '@/components/transparentButton';

function MusicControler(props: any) {
  return (
    <div className="music_controler">
      <TransparentButton>
        <i className="iconfont icon-24gl-volumeMiddle"></i>
      </TransparentButton>
      <TransparentButton>
        <i className="iconfont icon-24gl-previous"></i>
      </TransparentButton>
      <TransparentButton>
        <i className="iconfont icon-24gl-play"></i>
      </TransparentButton>
      <TransparentButton>
        <i className="iconfont icon-24gl-next"></i>
      </TransparentButton>
      <TransparentButton>词</TransparentButton>
    </div>
  );
}

export default MusicControler;
