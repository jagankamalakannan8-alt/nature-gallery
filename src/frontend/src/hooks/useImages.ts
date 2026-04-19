import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalBlob, createActor } from "../backend";
import type { Image } from "../types";

const QUERY_KEY = ["images"] as const;

export function useImages() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Image[]>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      if (!actor) return [];
      const images = await actor.listImages();
      return images as Image[];
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useUploadImage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      filename,
      blob,
      onProgress,
    }: {
      filename: string;
      blob: Uint8Array<ArrayBuffer>;
      onProgress?: (pct: number) => void;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      let externalBlob = ExternalBlob.fromBytes(blob);
      if (onProgress) {
        externalBlob = externalBlob.withUploadProgress(onProgress);
      }
      return actor.uploadImage(filename, externalBlob) as Promise<Image>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useDeleteImage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteImage(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
