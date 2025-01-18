"use client";
import { useState, useEffect } from "react";
import { Container } from "@/components/Container";
import CollectionCarousel from "@/components/Home/CollectionCarousel";
import CollectionList from "@/components/Home/MarketList";
import { AxiosInstance } from "@/utils/axios";
import { TMarketlist } from "@/types/marketlists.type";
import { TCollection } from "@/types/collections.type";

export default function Home() {
  const [marketlists, setMarketlists] = useState<TMarketlist[]>([]);
  const [collections, setCollections] = useState<TCollection[]>([]);

  const fetchMarketlists = async () => {
    try {
      const response = await AxiosInstance.get("apis/marketlists");
      setMarketlists(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCollections = async () => {
    try {
      const response = await AxiosInstance.get(
        "apis/collections/getBannerCollections"
      );
      setCollections(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    fetchMarketlists();
    fetchCollections();
  }, []);

  return (
    <div className="h-hull bg-background py-[50px]">
      <div className="h-full w-full">
        <Container padding>
          <CollectionCarousel collections={collections} />
          <CollectionList marketlists={marketlists} />
        </Container>
      </div>
    </div>
  );
}
