import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import queryString from "query-string";

import {
  Button,
  Card,
  CardTitle,
  FormControl,
  Input,
  Select,
  SelectItem
} from "../../../components/v2";
import {
  useGetIntegrationAuthApps,
  useGetIntegrationAuthById
} from "../../../hooks/api/integrationAuth";
import { useGetWorkspaceById } from "../../../hooks/api/workspace";
import createIntegration from "../../api/integrations/createIntegration";

const variableTypes = [
  { name: "env" },
  { name: "terraform" }
];

export default function TerraformCloudCreateIntegrationPage() {
  const router = useRouter();

  const { integrationAuthId } = queryString.parse(router.asPath.split("?")[1]);

  const { data: workspace } = useGetWorkspaceById(localStorage.getItem("projectData.id") ?? "");
  const { data: integrationAuth } = useGetIntegrationAuthById((integrationAuthId as string) ?? "");
  const { data: integrationAuthApps } = useGetIntegrationAuthApps({
    integrationAuthId: (integrationAuthId as string) ?? ""
  });

  const [selectedSourceEnvironment, setSelectedSourceEnvironment] = useState("");
  const [targetApp, setTargetApp] = useState("");
  const [secretPath, setSecretPath] = useState("/");
  const [variableType, setVariableType] = useState("");
  const [variableTypeErrorText, setVariableTypeErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (workspace) {
      setSelectedSourceEnvironment(workspace.environments[0].slug);
      setVariableType(variableTypes[0].name);
    }
  }, [workspace]);

  useEffect(() => {
    if (integrationAuthApps) {
      if (integrationAuthApps.length > 0) {
        setTargetApp(integrationAuthApps[0].name);
      } else {
        setTargetApp("none");
      }
    }
  }, [integrationAuthApps]);

  const handleButtonClick = async () => {
    try {
      if (!integrationAuth?._id) return;

      setVariableTypeErrorText("");
      if (variableType.length === 0 ) {
      setVariableTypeErrorText("Variable Type cannot be blank!")
      return;
      }

      setIsLoading(true);

      await createIntegration({
        integrationAuthId: integrationAuth?._id,
        isActive: true,
        app: targetApp,
        appId:
          integrationAuthApps?.find((integrationAuthApp) => integrationAuthApp.name === targetApp)
            ?.appId ?? null,
        sourceEnvironment: selectedSourceEnvironment,
        targetEnvironment: null,
        targetEnvironmentId: null,
        targetService: variableType,
        targetServiceId: null,
        owner: null,
        path: null,
        region: null,
        secretPath
      });

      setIsLoading(false);

      router.push(`/integrations/${localStorage.getItem("projectData.id")}`);
    } catch (err) {
      console.error(err);
    }
  };


  return integrationAuth &&
    workspace &&
    selectedSourceEnvironment &&
    integrationAuthApps &&
    targetApp ? (
    <div className="flex h-full w-full items-center justify-center">
      <Card className="max-w-md rounded-md p-8">
        <CardTitle className="text-center">Terraform Cloud Integration</CardTitle>
        <FormControl label="Project Environment" className="mt-4">
          <Select
            value={selectedSourceEnvironment}
            onValueChange={(val) => setSelectedSourceEnvironment(val)}
            className="w-full border border-mineshaft-500"
          >
            {workspace?.environments.map((sourceEnvironment) => (
              <SelectItem
                value={sourceEnvironment.slug}
                key={`source-environment-${sourceEnvironment.slug}`}
              >
                {sourceEnvironment.name}
              </SelectItem>
            ))}
          </Select>
        </FormControl>
        <FormControl label="Secrets Path">
          <Input
            value={secretPath}
            onChange={(evt) => setSecretPath(evt.target.value)}
            placeholder="Provide a path, default is /"
          />
        </FormControl>
        <FormControl label="Category" className="mt-4" errorText={variableTypeErrorText}
            isError={variableTypeErrorText !== "" ?? false}>
          <Select
            value={variableType}
            onValueChange={(val) => setVariableType(val)}
            className="w-full border border-mineshaft-500"
          >
            {
              variableTypes.map((variable) => (
                <SelectItem
                  value={variable.name}
                  key={`target-app-${variable.name}`}
                >
                  {variable.name}
                </SelectItem>
              ))
            }
          </Select>
        </FormControl>
        <FormControl label="Terraform Cloud Project" className="mt-4">
          <Select
            value={targetApp}
            onValueChange={(val) => setTargetApp(val)}
            className="w-full border border-mineshaft-500"
            isDisabled={integrationAuthApps.length === 0}
          >
            {integrationAuthApps.length > 0 ? (
              integrationAuthApps.map((integrationAuthApp) => (
                <SelectItem
                  value={integrationAuthApp.name}
                  key={`target-app-${integrationAuthApp.name}`}
                >
                  {integrationAuthApp.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="none" key="target-app-none">
                No project found
              </SelectItem>
            )}
          </Select>
        </FormControl>
        <Button
          onClick={handleButtonClick}
          color="mineshaft"
          className="mt-4"
          isLoading={isLoading}
          isDisabled={integrationAuthApps.length === 0}
        >
          Create Integration
        </Button>
      </Card>
    </div>
  ) : (
    <div />
  );
}

TerraformCloudCreateIntegrationPage.requireAuth = true;
