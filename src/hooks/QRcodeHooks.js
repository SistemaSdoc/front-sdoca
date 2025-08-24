import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export function useQrCodeData() {
  const params = useParams();
  const token = params.token ? decodeURIComponent(params.token) : null;

  return useQuery({
    queryKey: ["qrcode", token],
    queryFn: async () => {
      const response = await axios.get(`/documentos/qrcode/${token}`);
      console.log(response.data);
      return response.data;
    },
    enabled: !!token,
    onError: (error) => {
      console.log('erro ao carregar dados: ', error);
      toast.error("Erro ao carregar dados");
    }
  });
}
