import './index.scss';
import TransparentBox1 from '@/components/pages/transparentBox1';

function BottomSpectrum(props: { [propName: string]: any }) {
  return (
    <TransparentBox1>
      <div className="bottom_spectrum">频谱</div>
    </TransparentBox1>
  );
}

export default BottomSpectrum;
