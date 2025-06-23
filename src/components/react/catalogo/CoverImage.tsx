interface Props {
  coverDataUrl: string;
}

export const CoverImage = ({ coverDataUrl }: Props) => (
  <img
    className="max-w-[1360px] w-full mx-auto rounded-[50px] object-cover"
    src={coverDataUrl}
    alt="Catalog Cover"
    id="catalogSection"
  />
);
