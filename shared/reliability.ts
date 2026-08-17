export function getConnectionErrorMessage(error: unknown) {
  if (error && typeof error === "object" && "name" in error && error.name === "AbortError") {
    return "The connection timed out. Please check your internet connection and try again.";
  }
  return "Unable to connect right now. Please check your internet connection and try again.";
}
