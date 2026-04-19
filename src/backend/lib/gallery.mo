import Storage "mo:caffeineai-object-storage/Storage";
import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/gallery";

module {
  public func listImages(images : List.List<Types.Image>) : [Types.Image] {
    images.toArray();
  };

  public func addImage(
    images : List.List<Types.Image>,
    id : Types.ImageId,
    filename : Text,
    blob : Storage.ExternalBlob,
  ) : Types.Image {
    let image : Types.Image = {
      id;
      filename;
      uploadedAt = Time.now();
      blob;
    };
    images.add(image);
    image;
  };

  public func deleteImage(
    images : List.List<Types.Image>,
    id : Types.ImageId,
  ) : Bool {
    let sizeBefore = images.size();
    let filtered = images.filter(func(img) { img.id != id });
    images.clear();
    images.append(filtered);
    images.size() < sizeBefore;
  };
};
