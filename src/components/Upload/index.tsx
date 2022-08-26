import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Popconfirm } from 'antd';

import { connect } from 'react-redux';
import { changeBG } from '@/redux/modules/layouts/bg/action';
import { BACKGROUND } from '@/constant/LocalStorage';

const BlackUpload = (props: any) => {
  return (
    <Upload
      className="black_upload"
      accept="image/*"
      beforeUpload={(file) => {
        const reader = new FileReader();
        let couldUpload = true;
        reader.onloadend = function () {
          if (couldUpload && reader.result) {
            localStorage.setItem(BACKGROUND, reader.result + '');
            props.changeBG();
          }
        };
        if (file) {
          reader.readAsDataURL(file);
          if (file.size / 1024 / 1024 > 1.5) {
            message.warning('图片超过 1.5MB ，请重新选择');
            couldUpload = false;
            return Upload.LIST_IGNORE;
          }
        }

        return Upload.LIST_IGNORE;
      }}
      capture={false}
    >
      <Button icon={<UploadOutlined />} className="yellow_button">
        点击上传图片
      </Button>
    </Upload>
  );
};
export default connect(() => ({}), {
  changeBG,
})(BlackUpload);
