import AuthLib "../lib/auth";
import Types "../types/auth";

mixin (authState : Types.AuthState) {
  /// Authenticate the caller via Internet Identity.
  /// First caller becomes admin; returns whether this caller is admin.
  public shared ({ caller }) func login() : async Bool {
    AuthLib.login(authState, caller);
  };

  /// Query whether the caller is the designated admin.
  public query ({ caller }) func checkIsAdmin() : async Bool {
    AuthLib.isAdmin(authState, caller);
  };
};
