import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { END_POINT } from "@/config/endPoint";
import SERVER_URL from "@/config/serverUrl";
import useProducts from "@/hooks/useProducts";
import { server } from "@/mocks/servers";
import { renderHook, waitFor, act } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import mockProducts from "@/mocks/mockResponse/products.json";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useProducts 테스트", () => {
  it("상품 목록을 조회한다.", async () => {
    const sort = "낮은 가격순";
    const category = "전체";
    const { result } = renderHook(() => useProducts({ sort, category }), { wrapper });

    const expectedLength = mockProducts.content.length;

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(expectedLength);
    });
  });

  // it("상품 목록 조회 중 에러 상태", async () => {
  //   server.use(
  //     http.get(SERVER_URL.apiUrl + END_POINT.products, () => {
  //       return new HttpResponse(JSON.stringify({ ok: false }), { status: 500 });
  //     })
  //   );

  //   const sort = "낮은 가격순";
  //   const category = "전체";
  //   const { result } = renderHook(() => useProducts({ sort, category, isIntersecting: false }), { wrapper });

  //   act(() => {
  //     result.current.fetchNextPage();
  //   });

  //   await waitFor(() => {
  //     expect(result.current.isError).toBe(true);
  //     expect(result.current.products).toHaveLength(20);
  //   });
  // });

  it("첫 페이지에서는 20개의 상품을 불러온다.", async () => {
    const sort = "낮은 가격순";
    const category = "전체";
    const { result } = renderHook(() => useProducts({ sort, category, isIntersecting: false }), { wrapper });

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
    });
  });
});
