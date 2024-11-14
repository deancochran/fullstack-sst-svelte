/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: 'fullstack-sst-svelte',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			home: 'aws'
		};
	},
	async run() {
		const vpc = new sst.aws.Vpc("MyVpc", { nat: "ec2", bastion: true });
    const rds = new sst.aws.Postgres("MyPostgres", { vpc, proxy: true });
    const redis = new sst.aws.Redis("MyRedis", { vpc });
    
    
		const cluster = new sst.aws.Cluster('MyCluster', { vpc });
		cluster.addService('MyService', {
			loadBalancer: {
				ports: [{ listen: '80/http', forward: '3000/http' }]
			},
			dev: {
				command: 'npm run dev'
			},
      link: [redis, rds],
		});
    // new sst.aws.Function("MyApi", {
    //   vpc,
    //   url: true,
    //   link: [rds],
    //   handler: "src/api.handler",
    // });

    new sst.x.DevCommand("Studio", {
      link: [rds],
      dev: {
        command: "npx drizzle-kit studio",
      },
    });

    

    return {
      cluster: cluster.urn,
      vpc: vpc.urn,
      rds: rds.urn,
      redis: redis.urn
    };
	}
});
