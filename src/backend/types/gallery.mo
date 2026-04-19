import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type ImageId = Common.ImageId;
  public type Timestamp = Common.Timestamp;

  public type Image = {
    id : ImageId;
    filename : Text;
    uploadedAt : Timestamp;
    blob : Storage.ExternalBlob;
  };
};
