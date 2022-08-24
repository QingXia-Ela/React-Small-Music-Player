import './index.scss';
import TransparentBox1 from '@/components/pages/transparentBox1';
import PlayList from '@/components/MusicPlayer/playList';

function LeftList(props: any) {
  return (
    <div className="left_list h100">
      <TransparentBox1 title="播放列表">
        <PlayList hideButton={true} disabledDragable />
      </TransparentBox1>
    </div>
  );
}

export default LeftList;
