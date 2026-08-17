import { useState } from "react";
import { Image, type ImageProps } from "react-native";

const FALLBACK = require("@/assets/images/icon.png");

export function SafeImage({ source, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);
  return <Image {...props} source={failed ? FALLBACK : source} onError={() => setFailed(true)} />;
}
