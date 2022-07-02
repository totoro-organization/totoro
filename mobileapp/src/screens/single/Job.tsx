import React from "react";
import styled from "styled-components/native";
import { Heading, Text } from "../../components/atoms/Text";
import GlobalLayout from "../../components/layouts/GlobalLayout";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../../navigation/StackNavigationParams";
import Button from "../../components/atoms/Button";
import Spacer from "../../components/atoms/Spacer";
import Heart from "../../assets/icons/Heart";
import Box from "../../components/atoms/Box";
import { ImageBackground } from "react-native";
import JobDetail from "../../components/molecules/JobDetail";
import Location from "../../assets/icons/Location";
import Calendar from "../../assets/icons/Calendar";
import { Link } from "@react-navigation/native";
import { FAKE_MISSIONS_DATA } from "../../common/mockedData";
import useUserFavorites from "../../common/api/hooks/useUserFavorites";
import addUserFavorite from "../../common/api/requests/addUserFavorite";
import Toast from "react-native-toast-message";
import Check from "../../assets/icons/Check";
import useAuth from "../../common/contexts/AuthContext";
import deleteFavorite from "../../common/api/requests/deleteFavorite";
import useJob from "../../common/api/hooks/useJob";
import { API_HOST } from "../../common/api/routes";

export default function Job({
  route,
}: StackScreenProps<StackParamList, "Job">) {
  const jobId = route.params.id;
  const { user } = useAuth();
  const { userFavorites } = useUserFavorites(user?.id || "");

  const { job } = useJob(jobId);

  const currentFavorite = userFavorites?.filter(
    (fav) => fav.organization.id === job?.author.organization.id
  );
  const isOrganizationFollow =
    currentFavorite !== undefined && currentFavorite.length > 0;

  async function handleFollowOrganization(assos_id: string) {
    try {
      const response = await addUserFavorite(assos_id);

      if (response.status === 201) {
        Toast.show({
          type: "success",
          props: {
            title: "Tout est bon",
            text: `Merci d'avoir follow ${job?.author.organization.name} !`,
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUnfollowOrganization(favoriteId: string) {
    try {
      await deleteFavorite(favoriteId);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <GlobalLayout
      header={<></>}
      fullBanner={
        <StyledImage
          // FIXME
          source={{ uri: `http://localhost:6868${job?.attachments[0]?.image}` }}
          resizeMode="cover"
        />
      }
    >
      {/* TODO: Add Tag atom.*/}
      <Text color="info">{job?.tags[0].label}</Text>

      <Spacer axis="vertical" size={1} />

      <Heading variant="h1" weight="regular">
        {job?.title}
      </Heading>

      <Spacer axis="vertical" size={0.5} />

      <Text color="grey">
        <TextLight>Organisé par</TextLight>&nbsp;
        <Link
          to={{
            screen: "Profile",
            params: { id: job?.author.id, type: "organization" },
          }}
        >
          {job?.author.organization.name}
        </Link>
      </Text>

      <Spacer axis="vertical" size={2} />

      <Box alignItems="center">
        <Button size="sm" color="black" Icon={<Heart color="white" />}>
          Sauvegarder
        </Button>

        <Spacer axis="horizontal" size={0.75} />

        <TextLight size="sm">{/* FIXME */}8 personnes intéressé.e.s</TextLight>
      </Box>

      <Spacer axis="vertical" size={3} />

      <JobDetail
        Icon={<Location size={24} />}
        title={job?.commune}
        text={job?.address}
      />

      <Spacer axis="vertical" size={0.5} />

      <JobDetail
        Icon={<Calendar size={24} />}
        title="20 Juin 2022"
        text="10h00 à 15h30"
      />

      <HeadingSection>Description</HeadingSection>
      <Text color="grey">{job?.description}</Text>

      <HeadingSection>Organisé par</HeadingSection>
      <Box justifyContent="space-between" alignItems="center">
        <Link
          to={{
            screen: "Profile",
            params: { id: job?.author.organization.id, type: "organization" },
          }}
        >
          <Box alignItems="center">
            <ImageBackground
              source={{ uri: job?.author.organization.logo }}
              style={{ width: 80, height: 40 }}
              resizeMode="contain"
            />

            <Spacer axis="horizontal" size={1} />

            <Box flexDirection="column">
              <Text>{job?.author.organization.name}</Text>
              <Text color="grey" size="sm">
                {job?.author.organization.commune}
              </Text>
            </Box>
          </Box>
        </Link>

        {isOrganizationFollow && (
          <Button
            size="sm"
            color="grey"
            variant="outline"
            Icon={<Check />}
            handlePress={() =>
              handleUnfollowOrganization(currentFavorite[0].id)
            }
          >
            Suivi
          </Button>
        )}

        {!isOrganizationFollow && (
          <Button
            size="sm"
            color="black"
            handlePress={() =>
              handleFollowOrganization(job?.author.organization.id as string)
            }
          >
            Suivre
          </Button>
        )}
      </Box>

      <Spacer axis="vertical" size={4} />

      {/* TODO: Add call api */}
      <Button>Je participe !</Button>
    </GlobalLayout>
  );
}

const StyledImage = styled.ImageBackground`
  width: 100%;
  height: 200px;
`;

const TextLight = styled(Text)`
  color: ${({ theme }) => theme.colors.grey[400]};
`;

const HeadingSection = styled(Text)`
  margin-top: ${({ theme }) => theme.spacing[8]};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
`;
