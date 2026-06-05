import Common "common";

module {
  public type UserId = Principal;
  public type Timestamp = Common.Timestamp;

  /// Tracks which principals have authenticated and who is admin
  public type AuthState = {
    var adminPrincipal : ?Principal;
  };
};
